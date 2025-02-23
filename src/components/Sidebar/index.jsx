import { categories } from "../constants"
import { Link } from "react-router-dom"

const Sidebar = ({ selectedCat }) => {

    return (
        <aside>
            {categories.map((i, index) => (
                <Link key={index} to={`/?cat=${i.path}`} >
                    <div className={`flex items-center gap-2 py-4 px-2 md:px-3 md:text-lg cursor-pointer rounded-md hover:bg-[#2d2d2d] transition ${(i.path === selectedCat || (i.path === "/" && !selectedCat)) && "bg-[#242424]"}  `}>
                        <span className="max-md:text-2xl">{i.icon}</span>
                        <span className="max-md:hidden">{i.name}</span>
                    </div>
                    {i.divider && <hr />}
                </Link>
            ))
            }

        </aside >
    )
}

export default Sidebar