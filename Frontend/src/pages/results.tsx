import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import * as yup from "yup";
import { fetchCustom } from "@/utils/fetchCustom";
import { useEffect, useRef, useState } from "react";

import { generateSelectOptions } from "./create-team";
import { CHeader } from "./_document";
import ShowToast from "../components/toast";
import CButton from "@/components/button";
import CGraphics from "@/components/graphics_barchart";
import { Theme, useTheme } from "@mui/material/styles";
import CGraphicsPieChart from "@/components/graphics_piechart";

const schema1 = yup.object().shape({
  player: yup.string().required("* Campo requerido"),
  weekSelector: yup.string().required("* Campo requerido"),
  // player_week: yup.string().required("* Campo requerido"),
});

type UserElite = {
  _id: string;
  average_speed: number;
  maximum_speed: number;
  traveled_distance: number;
  average_heart_rate: number;
  sprint: number;
  time_played: number;
  role: string;
  name: string;
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Results: NextPage = () => {
  const theme = useTheme();
  const [player, setPlayer] = useState([]);
  const [calculation, setCalculation] = useState<any>(null);
  const [weekList, setWeekList] = useState<any>([]);
  const [weekListSelector, setWeekListSelector] = useState<any>([]);
  const [playerWeeksSelected, setPlayerWeeksSelected] = useState<string[]>([]);
  const [playersElite, setPlayersElite] = useState<any>([]);
  // const [playersEliteFiltered, setPlayersEliteFiltered] = useState<any>([])
  const playersEliteFilteredRef = useRef<any>([]);
  const [iotSelected, setIotSelected] = useState("Distancia");
  const [dataGraphics, setDataGraphics] = useState<any>([]);
  const [dataGraphicsPieChart, setDataGraphicsPieChart] = useState<any>([]);

  useEffect(() => {
    fetchCustom({ path: "/player" }).then((resp) => setPlayer(resp));
    fetchCustom({ path: "/player-statistics" }).then((data: UserElite[]) =>
      setPlayersElite(data)
    );
  }, []);

  const { handleSubmit, control, watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema1),
  });

  useEffect(() => {
    if (!watch("player")) return;

    ShowToast({
      path: `/exercise-calculation/record?player=${watch("player")}`,
      method: "GET",
    }).then((response: any) => {
      if (!response.status) return;
      setWeekList(response?.data?.weeks);
      const weeksSelectors = Array.from(response?.data?.weeks).map(
        (week: any) => {
          return {
            _id: week.number,
            name: week.number,
          };
        }
      );
      setWeekListSelector(weeksSelectors);
      setPlayerWeeksSelected([]);
    });
  }, [watch("player")]);

  const handleChangeIoT = (event: SelectChangeEvent) => {
    setIotSelected(event.target.value as string);
  };

  const handleChangeMultipleSelectors = (
    event: SelectChangeEvent<typeof playerWeeksSelected>
  ) => {
    const {
      target: { value },
    } = event;
    setPlayerWeeksSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const convertToGraphicsData = (
    records: any,
    propToFilter: any,
    playerRole: any
  ) => {
    const data = playerWeeksSelected.map((week: any) => {
      const filterRecordByWeek: any = Array.from(records).filter(
        (record: any) => record.week === week.number
      )[0];
      const filterUseRecordByArtefactoIoT =
        filterRecordByWeek[`${propToFilter}`];
      const filterUserExpertByArtefactoIoT: any = Array.from(
        playersElite
      ).filter((record: any) => record.role === playerRole)[0];
      // setPlayersEliteFiltered(filterUserExpertByArtefactoIoT)
      playersEliteFilteredRef.current = filterUserExpertByArtefactoIoT;
      const graphicData = {
        name: `Semana ${week.date}`,
        jugador_amateur: filterUseRecordByArtefactoIoT,
        jugador_elite: filterUserExpertByArtefactoIoT[`${propToFilter}`],
        amt: 2400,
      };
      return graphicData;
    });

    return data;
  };

  const onSubmit = async (body: any) => {
    const responseRecord = await ShowToast({
      path: `/exercise-calculation/record?player=${body.player}&week=${body.weekSelector}`,
      method: "GET",
    });
    const responseListRecords = await ShowToast({
      path: `/exercise-calculation/record?player=${body.player}`,
      method: "GET",
    });
    if (!responseListRecords.status || !responseRecord.status) return;
    const graphics = convertToGraphicsData(
      responseListRecords.data.records,
      iotSelected,
      responseListRecords.data.player.role
    );
    setCalculation(responseRecord.data);
    setDataGraphics(graphics);
    const playerEliteSelected: any = playersEliteFilteredRef.current;
    const dataGraphicsToPieChart = [
      {
        name: "Distancia Recorrida",
        value: Number(playerEliteSelected.traveled_distance),
      },
      {
        name: "Frencuencia Cardiaca",
        value: Number(playerEliteSelected.average_heart_rate),
      },
      { name: "Sprint", value: Number(playerEliteSelected.sprint) },
      { name: "Tiempo Jugado", value: Number(playerEliteSelected.time_played) },
      {
        name: "Velocidad Máxima",
        value: Number(playerEliteSelected.maximum_speed),
      },
      {
        name: "Velocidad Media",
        value: Number(playerEliteSelected.average_speed),
      },
    ];
    setDataGraphicsPieChart(dataGraphicsToPieChart);
  };

  return (
    <div>
      <CHeader />
      <div style={{ height: 80 }} />
      <div style={{ display: "flex", marginTop: 30 }}>
        <div style={{ width: "48%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              margin: "auto",
            }}
          >
            <div style={{ paddingTop: 15, paddingBottom: 15 }}>
              <Controller
                control={control}
                name="player"
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <FormControl fullWidth>
                    <InputLabel error={invalid}>
                      Selecciona un futbolista
                    </InputLabel>
                    <Select
                      value={value}
                      label="Selecciona un futbolista"
                      onChange={onChange}
                      error={invalid}
                    >
                      {generateSelectOptions(player)}
                    </Select>
                    {error && (
                      <FormHelperText error>{error?.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <div>
                <FormControl
                  fullWidth
                  style={{ marginTop: 50, marginBottom: 50 }}
                >
                  <InputLabel id="demo-simple-select-label2">
                    Artefactor IOT
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    value={iotSelected}
                    label="Artefactor IOT"
                    onChange={handleChangeIoT}
                  >
                    <MenuItem value="traveled_distance">
                      Distancia Recorrida
                    </MenuItem>
                    <MenuItem value="average_heart_rate">
                      Frencuencia Cardiaca
                    </MenuItem>
                    <MenuItem value="sprint">Sprint</MenuItem>
                    <MenuItem value="time_played">Tiempo Jugado</MenuItem>
                    <MenuItem value="maximum_speed">Velocidad Máxima</MenuItem>
                    <MenuItem value="average_speed">Velocidad Media</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ marginBottom: 50 }}>
                <Controller
                  control={control}
                  name="weekSelector"
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid, error },
                  }) => (
                    <FormControl fullWidth>
                      <InputLabel error={invalid}>
                        Selecciona una semana para su análisis
                      </InputLabel>
                      <Select
                        value={value}
                        label="Selecciona una semana para su análisi"
                        onChange={onChange}
                        error={invalid}
                      >
                        {generateSelectOptions(weekListSelector)}
                      </Select>
                      {error && (
                        <FormHelperText error>{error?.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </div>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Semanas a comparar
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  label="Semanas a comparar"
                  value={playerWeeksSelected}
                  onChange={handleChangeMultipleSelectors}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Semana" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: any) => (
                        <Chip key={value} label={`Semana ${value.number}`} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {weekList?.map((week: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={week}
                      style={getStyles(week.number, playerWeeksSelected, theme)}
                    >
                      {week.number}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div style={{ paddingTop: 30 }}>
                <CButton
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  text="Realizar Análisis"
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "48%", marginTop: 10 }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Resultado de análisis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>Posición del campo : {calculation?.player?.role}</div>
                  <div>Nombre del futbolista : {calculation?.player?.name}</div>
                  <div>
                    <br />
                  </div>
                  <div>
                    Velocidad media:{" "}
                    <span
                      style={
                        calculation?.records[0].average_speed_calculated > 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {calculation?.records[0].average_speed_calculated.toFixed(
                        2
                      )}
                      {calculation?.records[0].average_speed_calculated.toFixed(
                        2
                      ) && "%"}
                    </span>
                  </div>
                  <div>
                    Velocidad máxima:{" "}
                    <span
                      style={
                        calculation?.records[0].maximum_speed_calculated > 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {calculation?.records[0].maximum_speed_calculated.toFixed(
                        2
                      )}
                      {calculation?.records[0].maximum_speed_calculated.toFixed(
                        2
                      ) && "%"}
                    </span>
                  </div>
                  <div>
                    Distancia Recorrida:{" "}
                    <span
                      style={
                        calculation?.records[0].traveled_distance_calculated > 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {calculation?.records[0].traveled_distance_calculated.toFixed(
                        2
                      )}
                      {calculation?.records[0].traveled_distance_calculated.toFixed(
                        2
                      ) && "%"}
                    </span>
                  </div>
                  <div>
                    {" "}
                    Sprint (máxima velocidad):{" "}
                    <span
                      style={
                        calculation?.records[0].sprint_calculated > 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {calculation?.records[0].sprint_calculated.toFixed(2)}
                      {calculation?.records[0].sprint_calculated.toFixed(2) &&
                        "%"}
                    </span>
                  </div>
                  <div>
                    Frecuencia Cardiaca:{" "}
                    <span
                      style={
                        calculation?.records[0].average_heart_rate_calculated >
                        0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {calculation?.records[0].average_heart_rate_calculated.toFixed(
                        2
                      )}
                      {calculation?.records[0].average_heart_rate_calculated.toFixed(
                        2
                      ) && "%"}
                    </span>
                  </div>
                  <div>
                    Tiempo jugado:{" "}
                    <span
                      style={
                        calculation?.records[0].time_played_calculated > 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {calculation?.records[0].time_played_calculated.toFixed(
                        2
                      )}
                      {calculation?.records[0].time_played_calculated.toFixed(
                        2
                      ) && "%"}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ flex: 1, flexDirection: "row" }}>
        {dataGraphics.length > 0 ? (
          <div style={{ width: "80%", marginTop: 50, marginBottom: 50 }}>
            <CGraphics data={dataGraphics} />
          </div>
        ) : null}
        {dataGraphicsPieChart.length > 0 ? (
          <h2 style={{ textAlign: "center" }}>
            Jugador élite: {playersEliteFilteredRef.current?.name!}
          </h2>
        ) : null}
        {
          <div style={{ marginTop: 50, marginBottom: 50 }}>
            <CGraphicsPieChart data={dataGraphicsPieChart} />
          </div>
        }
      </div>
    </div>
  );
};

export default Results;
