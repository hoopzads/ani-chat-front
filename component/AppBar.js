import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Router from 'next/router'
import enhancedComponent from '../hoc/enhancedComponent';

const AppBarStyle = styled.section`
display: flex;
background-color: #F1F1F1;
margin: 0px;
padding: 10px 20px;
box-sizing: border-box;
justify-content: center;
align-items: center;
color: #2195F3;
${(props) => { return props.bgColor && `background-color: ${props.bgColor};`}}
${(props) => { return props.color && `color: ${props.color};` }}
position: fixed;

i {
    font-size: 2em;
    padding-right: 10px;
}
h1 {
    margin: 0px;
    padding: 0px;
}

.right {
    position: absolute;
    right: 10px;
}

button {
    background-color: #FFFFFF99;
    outline: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    border: 0px;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    margin-right: 5px;
    box-shadow: 0px 3px 10px #00000030;

    &:hover {
        filter: brightness(0.9);
        box-shadow: 0px 1px 10px #00000030;
    }

    &:active {
        filter: brightness(0.85);
        box-shadow: none;
    }

    i {
        padding: 0;
    }
}
`;

class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentWidth: -1
        }
    }
    componentDidMount() {
        this._isMounted = true
        let _this = this;
        setTimeout(() => {
            if(this._isMounted) {
                _this.setState({
                    parentWidth: ReactDOM.findDOMNode(_this._me).parentNode.offsetWidth
                })
                window.addEventListener("resize", () => {
                    if (ReactDOM.findDOMNode(_this._me)) {
                        _this.setState({
                            parentWidth: ReactDOM.findDOMNode(_this._me).parentNode.offsetWidth
                        })
                    }
                })
            }
        }, 10)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onLogout = () => {
        this.props.propsFunc.updateMapId("UserStat", "username", "")
        this.props.propsFunc.updateMapId("UserStat", "password", "")

        setTimeout(() => {
            Router.push({
                pathname: '/'
            });
        }, 0);
    }

    render() {
        const { text, icon, bgColor, color, isMain } = this.props;
        return (
            <AppBarStyle bgColor={bgColor} color={color} ref={(me) => this._me = me} style={{
                width: `${this.state.parentWidth}px`
            }}>
                <i className={icon} />
                <h1>{text}</h1>
                {
                    isMain && (
                        <div className="right">
                            <button title="Edit Profile">
                                <i className="fa fa-user" />
                            </button>
                            <button
                                onClick={this.onLogout}
                                title="Log out"
                            >
                                <i className="fa fa-sign-out" />
                            </button>
                        </div>
                    )
                }
            </AppBarStyle>
        );
    }
} 

AppBar.propTypes = {
    text: PropTypes.string.isRequired
}

export default AppBar;
