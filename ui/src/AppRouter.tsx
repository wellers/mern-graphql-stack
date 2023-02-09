import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactsContainer from "./containers/ContactsContainer";
import HomeContainer from "./containers/HomeContainer";

export const RouterUrls = {
	HomeUrl: '/',
	ContactsUrl: '/Contacts'
}

export default function AppRouter() {
	return (
		<>
			<Router basename="/">
				<Switch>
					<Route exact={true} path={RouterUrls.HomeUrl} component={Home} />
					<Route exact={true} path={RouterUrls.ContactsUrl} component={Contacts} />
					<Route component={PageNotFound} />
				</Switch>
			</Router>
		</>
	);
}

function Home() {
	return (
		<HomeContainer />
	);
}

function Contacts() {
	return (
		<ContactsContainer />
	);
}

function PageNotFound() {
	return (
		<span>Page Not Found</span>
	);
}