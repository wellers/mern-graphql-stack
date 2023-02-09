import * as React from "react";
import { Button, Col, Form, FormControlProps, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as API from "../api/contacts";
import { ContactSearch } from "../api/graphql-client/types";
import PageContentBox from "../components/PageContentBox";
import LoadObject from "../loadObject";
import { AppState } from "../stores";
import { ContactActions, ContactRecord } from "../types/contacts";
import "./ContactsContainer.less";

interface Props {
	readonly contacts: LoadObject<ReadonlyArray<ContactRecord>>;
	readonly dispatch: ThunkDispatch<AppState, undefined, ContactActions>;
	readonly pageNumber: number;
	readonly totalResultCount: number;
	readonly resultsPerPage: number;
	readonly serverError: string;
}

interface State {
	readonly searchTerm: string;
}

type EventHandler<T> = (ev: T) => void;
type TextChangedEvent = React.FormEvent<FormControlProps>;
type KeyDownEvent = React.KeyboardEvent<HTMLElement>;

class ContactsContainer extends React.Component<Props, State> {
	readonly _searchTermChange: EventHandler<TextChangedEvent>;
	readonly _searchKeyDown: EventHandler<KeyDownEvent>;
	readonly _onSearch: () => void;

	constructor(props: Props) {
		super(props);
		this.state = {
			searchTerm: ''
		};
		this._searchTermChange = this.handleFieldChange('searchTerm', ev => (ev.currentTarget.value as string || ''));
		this._searchKeyDown = ({ key }) => this.handleKeyDown(key);
		this._onSearch = () => this.fetchForCurrentCriteria();
	}

	componentDidMount() {
		this.fetchForCurrentCriteria();
	}

	fetchForCurrentCriteria(pageNumber?: number) {
		const search: ContactSearch = {
			search_term: (this.state.searchTerm || ''),
			page_number: (pageNumber || 1),
			results_per_page: 25
		};
		this.props.dispatch(API.fetchContacts(search));
	}

	handleKeyDown(key: string) {
		if (key === 'Enter') {
			this.fetchForCurrentCriteria();
		}
	}

	handleFieldChange<T, FieldKey extends keyof State>(fieldName: FieldKey, valuePreparer: (e: T) => State[FieldKey]) {
		return (ev: T) => {
			this.setState({ ...this.state, [fieldName]: valuePreparer(ev) });
		};
	}

	render() {
		const { contacts, serverError } = this.props;
		const { searchTerm } = this.state;
		return (
			<PageContentBox hideTrailingMargin={true}>
				{serverError && (serverError.length > 0)
					? <div className="alert alert-danger" role="alert">{serverError}</div>
					: undefined
				}
				<Row className={"searchControl"}>
					<Col>
						<Row className={"searchBar"}>
							<Col className="col-xs-12">
								<Form.Label htmlFor="searchTerm">What are you searching for?</Form.Label>
								<Form.Control type="text" value={searchTerm} onChange={this._searchTermChange} onKeyDown={this._searchKeyDown} id="searchTerm"></Form.Control>
							</Col>
						</Row>
						<Row>
							<Col className="d-flex flex-row-reverse">
								{contacts.isLoading
									? <Button onClick={this._onSearch} disabled>
										<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;&nbsp;
										<span>Searching...</span>
									</Button>
									: <Button onClick={this._onSearch}>Search</Button>
								}
							</Col>
						</Row>
					</Col>
				</Row>
				{contacts.isLoading
					? null
					:
					<Table>
						<thead>
							<tr>
								<th>Title</th>
								<th>Forename</th>
								<th>Surname</th>
							</tr>
						</thead>
						{contacts.hasValue && (contacts.value.length == 0)
							? <tbody>
								<tr>
									<td colSpan={3}>No results</td>
								</tr>
							</tbody>
							: this.renderResults(contacts)
						}
					</Table>
				}
			</PageContentBox>
		);
	}

	renderResults(results: LoadObject<ReadonlyArray<ContactRecord>>) {
		if (!results.hasValue) {
			return null;
		}
		return (
			<tbody>
				{results.value.map(i => {
					return (
						<tr>
							<td>
								{i.title}
							</td>
							<td>
								{i.forename}
							</td>
							<td>
								{i.surname}
							</td>
						</tr>
					);
				})}
			</tbody>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	const { contacts } = state;
	return {
		contacts: contacts.contacts,
		pageNumber: contacts.pageNumber,
		totalResultCount: contacts.totalResultCount,
		resultsPerPage: contacts.resultsPerPage,
		serverError: contacts.serverError
	};
};

export default connect(mapStateToProps)(ContactsContainer);