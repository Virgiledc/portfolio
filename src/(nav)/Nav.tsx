import NavText from "./NavText";
import NavMenu from "./NavMenu";
import NavSocials from "./NavSocials";

const Nav = () => {
	return (
		<div className="h-full py-24 px-12 lg:pl-32 lg:pr-16 flex flex-col justify-between">
			<div className="flex flex-col gap-10">
				<NavText />
				<NavMenu />
			</div>
			<div className="mt-8">
				<NavSocials />
			</div>
		</div>
	);
};

export default Nav;