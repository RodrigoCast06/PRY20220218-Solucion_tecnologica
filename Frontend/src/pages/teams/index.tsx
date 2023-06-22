import { NextPage } from "next";
import { fetchCustom } from "@/utils/fetchCustom";
import { useEffect, useState } from "react";
import { Button, Icon } from "@mui/material";
import { useRouter } from "next/router";
import { CHeader } from "../_document";
import DeleteIcon from '@mui/icons-material/Delete';
import ShowToast from "@/components/toast";

export const borderColor = "#C1C1C1"

const List: NextPage = () => {
    const [teams, setTeams] = useState([])
    const router = useRouter()
    useEffect(() => {
        fetchCustom({ path: '/team' }).then(resp =>
            setTeams(resp)
        )
    }, [])

    const handleDetails = (id: string) => {
        router.push(`/teams/${id}`)
    }

    const handleDelete = async (id: string) => {
        const response: any = await ShowToast({ path: `/team/${id}`, method: "DELETE" })
        // setTeams([])
        if (!response.status) return
        setTeams(prev => prev.filter((item: any) => item._id !== id))
    }

    return (
        <>
            <CHeader />
            <div style={{ height: 80 }} />
            <div style={{ width: '80%', margin: 'auto', marginTop: 50, marginBottom: 100 }}>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" style={{ textAlign: 'center' }}>Equipo</th>
                            <th scope="col" style={{ textAlign: 'center' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teams.map((team: any, index: any) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            {team.name}
                                        </div>
                                    </td>
                                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                                            <Button variant="outlined" onClick={() => handleDetails(team._id)}>
                                                Ver detalle
                                            </Button>
                                            <div style={{ paddingLeft: '20px' }}>
                                                <Button variant="outlined" color="error" onClick={() => handleDelete(team._id)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default List