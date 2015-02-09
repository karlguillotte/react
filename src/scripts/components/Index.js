import React from "react";
import Page from "./Page";
import { FloatingActionButton, Toolbar, Icon, ToolbarGroup } from "material-ui";
import { Link, RouteHandler } from "react-router";
import "../../styles/Index.less";

export default React.createClass({
    render() {
        return (
            <Page className="Index">
                <Toolbar>
                    <ToolbarGroup float="left">
                        <Link to="search">
                            <Icon icon="action-search" />
                        </Link>
                    </ToolbarGroup>
                </Toolbar>
                <RouteHandler />
            </Page>
        );
    }
});