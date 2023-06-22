import { TextField } from "@mui/material"
import { FC } from "react"
import { Control, Controller, FieldValues } from "react-hook-form"

type Props = {
    control: Control<FieldValues> | undefined
    name: string
    label: string
    type?: string
    syncWithBD?: boolean
}

const CInput: FC<Props> = ({ control, name, label, type, syncWithBD }) => {
    return (
        <div style={{ paddingTop: 15, paddingBottom: 15 }}>
            <Controller
                name={name}
                control={control}
                // defaultValue={name}
                render={({
                    field: { onChange, value },
                    fieldState: { invalid, error, isDirty },
                }) => (
                    <TextField
                        onChange={onChange}
                        value={value}
                        disabled={syncWithBD}
                        // defaultValue={value}
                        label={label}
                        // focused={value?.length > 0 ?? false}
                        error={invalid}
                        helperText={error?.message}
                        fullWidth
                        autoComplete="off"
                        type={type}
                        InputLabelProps={{
                          shrink: isDirty,
                        }}
                    />
                )}
            />
        </div>

    )
}

export default CInput