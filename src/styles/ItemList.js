import styled from 'styled-components';

const List = styled.li`
	margin-bottom: 10px;
	font-size: 16px;
	color: #666;
	align-content: stretch;
	display: flex;
	.button,
	.button:hover {
		border: 0;
		background-color: transparent;
		margin: 0;
		padding: 0;
		height: auto;
		width: auto;
		margin-right: 20px;
		align-self: start;
		color: rgb(27, 253, 190);
		cursor: pointer;
	}
	.button:hover {
		color: rgb(27, 253, 190)  !important;
		transition: 0.3s ease-in;
	}
	
	.item {
		width: 100%;
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.subitem {
		width: 50%;
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.linktittle {
		margin-right: 20px;
		font-size: 21px;
	}
	.p-done {
		text-decoration: line-through;
	}

	.icons {
		position: relative;
		.delete:hover,
		.edit:hover {
			color: rgb(27, 253, 190)  !important;
			transition: 0.3s ease-in;
		}
		.delete {
			position: absolute;
			right: 25px;
			top: 0px;
			margin: 0;
			cursor: pointer;
			color: white;
		}
		.edit {
			position: absolute;
			right: 70px;
			top: 0px;
			margin: 0;
			cursor: pointer;
			color: white;
		}
	}
`;

export default List;
