import React, { useCallback, useEffect, useState, ChangeEvent, useMemo } from "react";
import { Button, Col, Form, Row, Table, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as API from "../api/contacts";
import { ContactSearch } from "@wellers/graphql-client";
import PageContentBox from "../components/PageContentBox";
import { AppState } from "../stores";
import { ContactActions } from "../types/contacts";
import "./ContactsContainer.less";
import * as Actions from "../actions/contacts";

type ContactState = {
	title: string,
	forename: string,
	surname: string
}

export default function ContactsContainer() {
	const dispatch: ThunkDispatch<AppState, undefined, ContactActions> = useDispatch();
	const { contacts, showAddContact, serverError } = useSelector((state: AppState) => state.contacts);

	const [state, setState] = useState({
		searchTerm: ""
	});

	const [contact, setContactState] = useState<ContactState>({
		title: "",
		forename: "",
		surname: ""
	});

	useEffect(() => {
		fetchForCurrentCriteria();
	}, []);

	const fetchForCurrentCriteria = useCallback((pageNumber?: number) => {
		const search: ContactSearch = {
			search_term: (state.searchTerm || ''),
			page_number: (pageNumber || 1),
			results_per_page: 25
		};
		dispatch(API.fetchContacts(search));
	},
		[state.searchTerm, showAddContact, dispatch]
	);

	function handleKeyDown(key: string) {
		if (key === "Enter") {
			fetchForCurrentCriteria();
		}
	}

	function handleSearchTermChange(event: ChangeEvent<HTMLInputElement>) {
		setState(previousState => {
			return { ...previousState, searchTerm: event.currentTarget.value };
		});
	}

	const renderResults = useMemo(() => {
		if (!contacts.hasValue) {
			return null;
		}

		return (
			<tbody>
				{contacts.value.map(i => {
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
	}, [contacts]);

	function onSearch() {
		fetchForCurrentCriteria();
	}

	function handleSubmitContact() {
		dispatch(API.addContact(contact));
		fetchForCurrentCriteria();
	}

	function handleShowModal(showAddContact: boolean) {
		dispatch(Actions.toggleAddContact(showAddContact));
	}

	const handleChange = (field: keyof ContactState) => (event: ChangeEvent<HTMLInputElement>) => {
		setContactState(previousState => ({
			...previousState,
			[field]: event.target.value
		}));
	}

	const handleTitleOnChange = (event: ChangeEvent<HTMLInputElement>) => handleChange("title")(event);
	const handleForenameOnChange = (event: ChangeEvent<HTMLInputElement>) => handleChange("forename")(event);
	const handleSurnameOnChange = (event: ChangeEvent<HTMLInputElement>) => handleChange("surname")(event);

	function renderAddContactModal() {
		if (!showAddContact) {
			return;
		}

		return (
			<div className="modal show" style={{ display: 'block', position: 'initial' }}>
				<Modal.Dialog>
					<Modal.Header>
						<Modal.Title>Add Contact</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control type="text" value={contact.title} onChange={handleTitleOnChange}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>First name</Form.Label>
								<Form.Control type="text" value={contact.forename} onChange={handleForenameOnChange}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Last name</Form.Label>
								<Form.Control type="text" value={contact.surname} onChange={handleSurnameOnChange}></Form.Control>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => handleShowModal(false)}>Close</Button>
						<Button variant="primary" onClick={handleSubmitContact}>Add</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
		);
	}

	return (
		<>
			{renderAddContactModal()}
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
								<Form.Control
									type="text"
									value={state.searchTerm}
									onChange={handleSearchTermChange}
									onKeyDown={(ev) => handleKeyDown(ev.key)}
									id="searchTerm"></Form.Control>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button onClick={(() => handleShowModal(true))}>Add new contact</Button>
							</Col>
						</Row>
						<Row>
							<Col className="d-flex flex-row-reverse">
								{contacts.isLoading
									? 
									<Button onClick={onSearch} disabled>
										<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;&nbsp;
										<span>Searching...</span>
									</Button>
									: <Button onClick={onSearch}>Search</Button>
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
							? 
							<tbody>
								<tr>
									<td colSpan={3}>No results</td>
								</tr>
							</tbody>
							: renderResults
						}
					</Table>
				}
			</PageContentBox>
		</>
	);
};