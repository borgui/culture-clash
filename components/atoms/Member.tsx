import { User } from "@/types/user"
import Image from "next/image"
import { Mask } from "react-daisyui"

type Props = {
    user: User
}
export const Member = ({user}: Props) => {
    return (
            <div className="flex items-center space-x-3 truncate">
                  <Mask variant="squircle" src="http://daisyui.com/tailwind-css-component-profile-2@56w.png" />
                  <div>
                    <div className="font-bold">{user.username}</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
        )
}