import { Quote } from "../components/Quote"
import { Auth } from "../components/SigninAuth"

export const Signin = () => {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <Auth />
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
}