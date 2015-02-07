import React from 'react';
import Page from './Page';
import InfoPanel from './InfoPanel';
import { FloatingActionButton, Toolbar, Icon, ToolbarGroup } from 'material-ui';
import { Link } from 'react-router';
import '../../styles/Index.less';

export default React.createClass({
    render() {
        return (
            <Page className='Index'>
                <Toolbar>
                    <ToolbarGroup float="left">
                        <Link to="search">
                            <Icon icon="action-search" />
                        </Link>
                    </ToolbarGroup>
                </Toolbar>
                <InfoPanel />
            </Page>
        );
    }
});