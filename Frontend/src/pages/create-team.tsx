import { NextPage } from "next";
import SwipeableViews from 'react-swipeable-views';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import * as yup from "yup";

import { fetchCustom } from "@/utils/fetchCustom";
import { CHeader } from "./_document";
import ShowToast from "../components/toast";
import CButton from "../components/button";
import CInput from "../components/input";
import Image from "next/image";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const optionsMocks = [
    {
        name: "Dropdown Option 1",
        _id: "1",
    },
    {
        name: "Dropdown Option 2",
        _id: "2",
    },
];

const schema1 = yup.object().shape({
    name: yup.string().required("* Campo requerido").matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        '* Solo debe contener letras'
    )
});

const schema2 = yup.object().shape({
    name: yup.string().required("* Campo requerido").matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        '* Solo debe contener letras'
    ),
    coach: yup.string().required("* Campo requerido")
});

const schema3 = yup.object().shape({
    name: yup.string().required("* Campo requerido").matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
        '* Solo debe contener letras'
    ),
    age: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    height: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    weight: yup.number().typeError('* Debe ser un número').required("* Campo requerido"),
    team: yup.string().required("* Campo requerido"),
    role: yup.string().required("* Campo requerido"),
});


export const generateSelectOptions = (options = optionsMocks, value = "id") => {
    return options.map((option: any) => {
        return (
            <MenuItem key={option._id} value={value === "id" ? option._id : option.name}>
                {option.name}
            </MenuItem>
        );
    });
};

export const rolesList = [
    {
        _id: "1",
        name: "Delantero"
    },
    {
        _id: "2",
        name: "Defensa"
    },
    {
        _id: "3",
        name: "Volante"
    },
    {
        _id: "4",
        name: "Portero"
    },
]

const CreateTeam: NextPage = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0)
    const [coachs, setCoachs] = useState<any>([])
    const [teams, setTeams] = useState<any>([])

    useEffect(() => {
        fetchCustom({ path: '/coach' }).then(resp => setCoachs(resp))
        fetchCustom({ path: '/team' }).then(resp => setTeams(resp))
    }, [])


    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema1),
    });

    const { handleSubmit: handleSubmit2, control: control2 } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema2),
    });

    const { handleSubmit: handleSubmit3, control: control3 } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema3),
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const onSubmit = async ({ name, coach }: any) => {
        const newCoach = await ShowToast({ path: '/coach', method: "POST", body: { name, coach } })
        if (!newCoach.status) return
        setCoachs([...coachs, newCoach.data])
    };

    const onSubmit2 = async (body: any) => {
        const newTeam = await ShowToast({ path: '/team', method: "POST", body })
        if (!newTeam.status) return
        setTeams([...teams, newTeam.data])
    }

    const onSubmit3 = async (body: any) => {
        await ShowToast({ path: '/player', method: "POST", body })
    }

    const StepOne = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                <div style={{ display: 'flex', flex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <CInput
                            control={control}
                            label="Nombre del entrenador"
                            name="name"
                        />
                        <CButton
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                        />
                    </div>
                </div>
                <div>
                    <Image src="/imgs/entrenador.jpeg"
                        width={350}
                        height={400}
                        alt="imagen" />
                </div>
            </div>
        )
    }

    const StepTwo = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                <div style={{ display: 'flex', flex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
                        <CInput
                            control={control2}
                            label="Nombre del equipo"
                            name="name"
                        />
                        <div style={{ paddingTop: 15, paddingBottom: 15 }}>
                            <Controller
                                control={control2}
                                name="coach"
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid, error }
                                }) => (
                                    <FormControl fullWidth>
                                        <InputLabel error={invalid}>Seleccionar entrenador</InputLabel>
                                        <Select
                                            value={value}
                                            label="Entrenador"
                                            onChange={onChange}
                                            error={invalid}
                                        >
                                            {generateSelectOptions(coachs)}
                                        </Select>
                                        {error && <FormHelperText error>{error?.message}</FormHelperText>}
                                    </FormControl>
                                )}
                            />
                        </div>
                        <CButton
                            handleSubmit={handleSubmit2}
                            onSubmit={onSubmit2}
                        />
                    </div>
                </div>
                <div>
                    <Image src="/imgs/futbolista.jpeg"
                        width={400}
                        height={350}
                        alt="imagen" />
                </div>
            </div>

        )
    }

    const StepThree = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto' }}>
                <CInput
                    key="1"
                    name="name"
                    control={control3}
                    label="Nombre"
                />
                <CInput
                    key="2"
                    name="age"
                    control={control3}
                    label="Edad"
                />
                <CInput
                    key="3"
                    name="height"
                    control={control3}
                    label="Estatura"
                />
                <CInput
                    key="4"
                    name="weight"
                    control={control3}
                    label="Peso corporal"
                />
                <Controller
                    control={control3}
                    name="role"
                    render={({
                        field: { onChange, value },
                        fieldState: { invalid, error }
                    }) => (
                        <FormControl fullWidth>
                            <InputLabel error={invalid}>Posición</InputLabel>
                            <Select
                                value={value}
                                label="Posición"
                                onChange={onChange}
                                error={invalid}
                            >
                                {generateSelectOptions(rolesList, value = "name")}
                            </Select>
                            {error && <FormHelperText error>{error?.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                <div style={{ paddingTop: 15, paddingBottom: 15 }}>
                    <Controller
                        control={control3}
                        name="team"
                        render={({
                            field: { onChange, value },
                            fieldState: { invalid, error }
                        }) => (
                            <FormControl fullWidth>
                                <InputLabel error={invalid}>Selecciona un equipo</InputLabel>
                                <Select
                                    value={value}
                                    label="Selecciona un equipo"
                                    onChange={onChange}
                                    error={invalid}
                                >
                                    {generateSelectOptions(teams)}
                                </Select>
                                {error && <FormHelperText error>{error?.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                </div>

                <CButton
                    handleSubmit={handleSubmit3}
                    onSubmit={onSubmit3}
                />
            </div>
        )
    }

    return (
        <>
            <CHeader />
            <div style={{ height: 80 }} />
            <form>
                <Box sx={{ borderColor: '#E7EBEF', borderWidth: 8, width: "80%", margin: 'auto', marginTop: 8 }}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Entrenador" {...a11yProps(0)} />
                            <Tab label="Equipo" {...a11yProps(1)} />
                            <Tab label="Jugador" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel key="1" value={value} index={0} dir={theme.direction}>
                            <StepOne />
                            {/* <StepTwo /> */}
                        </TabPanel>
                        <TabPanel key="2" value={value} index={1} dir={theme.direction}>
                            <StepTwo />
                        </TabPanel>
                        <TabPanel key="3" value={value} index={2} dir={theme.direction}>
                            <StepThree />
                        </TabPanel>

                    </SwipeableViews>
                </Box>
            </form >
        </>

    );
};

export default CreateTeam;
