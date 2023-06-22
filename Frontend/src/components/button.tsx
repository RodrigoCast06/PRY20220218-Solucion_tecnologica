import { Button } from "@mui/material"
import { FC } from "react"
import { FieldValues, UseFormHandleSubmit } from "react-hook-form"

type Props = {
    text?: string
    handleSubmit: UseFormHandleSubmit<FieldValues>
    onSubmit: (body: any) => Promise<void>
}

const CButton: FC<Props> = ({ text = "Registrar", handleSubmit, onSubmit }) => {
    return <Button variant="contained" size="large" fullWidth onClick={handleSubmit(onSubmit)}>
        {text}
    </Button>
}

export default CButton
