import React, { useCallback, useEffect, useState, ChangeEvent } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as API from "../api/contacts";
import { ContactSearch } from "@wellers/graphql-client";
import PageContentBox from "../components/PageContentBox";
import LoadObject from "../loadObject";
import { AppState } from "../stores";
import { ContactActions, ContactRecord } from "../types/contacts";
import "./ContactsContainer.less";

interface Props { }

const ContactsContainer: React.FC<Props> = () => {
	const dispatch: ThunkDispatch<AppState, undefined, ContactActions> = useDispatch();
	const { contacts, serverError } = useSelector((state: AppState) => state.contacts);

	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		fetchForCurrentCriteria();
	}, []);

	const fetchForCurrentCriteria = useCallback((pageNumber?: number) => {
		const search: ContactSearch = {
			search_term: (searchTerm || ''),
			page_number: (pageNumber || 1),
			results_per_page: 25
		};
		dispatch(API.fetchContacts(search));
	},
		[searchTerm, dispatch]
	);

	const handleKeyDown = (key: string) => {
		if (key === "Enter") {
			fetchForCurrentCriteria();
		}
	};

	const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.currentTarget.value);
	};

	const renderResults = (results: LoadObject<ReadonlyArray<ContactRecord>>) => {
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

	const onSearch = () => {
		fetchForCurrentCriteria();
	};

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
							<Form.Control
								type="text"
								value={searchTerm}
								onChange={handleSearchTermChange}
								onKeyDown={(ev) => handleKeyDown(ev.key)}
								id="searchTerm"></Form.Control>
						</Col>
					</Row>
					<Row>
						<Col className="d-flex flex-row-reverse">
							{contacts.isLoading
								? <Button onClick={onSearch} disabled>
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
						? <tbody>
							<tr>
								<td colSpan={3}>No results</td>
							</tr>
						</tbody>
						: renderResults(contacts)
					}
				</Table>
			}
		</PageContentBox>
	);
}

export default ContactsContainer;