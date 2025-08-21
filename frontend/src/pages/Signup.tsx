import { Quote } from "../components/Quote"
import { Auth } from "../components/SignupAuth"

export const Signup = () => {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <Auth />
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
}