import dynamic from "next/dynamic";
import React, { ReactNode, Fragment } from "react";

const NoSsr = ({ children }: { children: ReactNode }) => (
    <Fragment>{children}</Fragment>
);

export default dynamic(() => Promise.resolve(NoSsr), {
    ssr: false,
});
