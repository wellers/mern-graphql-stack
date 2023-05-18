import React from "react";

interface HelloProps {
  compiler: string;
  framework: string;
}

const Hello: React.FC<HelloProps> = ({ compiler, framework }) => (
  <h1>Hello from {compiler} and {framework}!</h1>
);

export default Hello;