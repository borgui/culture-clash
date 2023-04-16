import { ChangeEventHandler } from "react"
import { Input, Radio } from "react-daisyui";

type Props = {
    name: string,
    placeHolder: string,
    checked: boolean
    onRadioChange: ChangeEventHandler<HTMLInputElement> 
    onInputChange: ChangeEventHandler<HTMLInputElement> 
}
export default function RadioInput({name, placeHolder, checked, onRadioChange, onInputChange}: Props){
    return (
        <div className="flex flex-row items-center">
            <Radio className="mr-2" name={name} onChange={onRadioChange} checked={checked} />
            <Input placeholder={placeHolder} onChange={onInputChange}/>
        </div>
    )
}