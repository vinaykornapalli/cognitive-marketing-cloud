import React from "react";

import { Spin } from "antd";

const Loader = () => {
  return (
    <Spin className="position-absolute top-50 start-50 translate-middle" />
  );
};

export default Loader;