import React, { FunctionComponent, memo } from "react";
import { Link } from "react-router-dom";

export interface IHomeProps {}

const Home: FunctionComponent<IHomeProps> = memo((props: IHomeProps) => {
  return (
    <div>
      {/* add other component here */}
      Home
      <Link to={"/other"}>test</Link>
    </div>
  );
});

export default Home;
