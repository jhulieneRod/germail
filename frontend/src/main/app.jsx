import React from 'react'
// import { HashRouter } from 'react-router-dom'
import Header from '../common/template/header'
import Messages from '../common/msg/messages'
import AppTabs from './appTabs';

class App extends React.Component {

    render() { 
        return (
            // <HashRouter>
                <>
                    {/* <Header /> */}
                    <AppTabs />
                    {/* <Footer /> */}
                    <Messages />
                </>
            // </HashRouter>
        )
    }
}

export default App;