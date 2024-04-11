import React from "react";

interface HelloProps {
  compiler: string;
  framework: string;
}

function Hello({ compiler, framework }: HelloProps) {
	return (
		<h1>Hello from {compiler} and {framework}!</h1>
	);	  
}

export default Hello;