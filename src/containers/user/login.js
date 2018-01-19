import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Toast } from '../../components/toast';
import * as userActions from '../../redux/actions/user';
import {HeaderComponent} from "../../components/header";
import * as userRequest from "../../api/user";

const { width, height } = Dimensions.get('window');

class UserLogin extends Component{

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            username: 'merchant@example.com',
            password: 'secret',
        }
    }

    login = ()=>{
        let { username, password } = this.state;
        console.log(username);
        if(username==null||username===''){
            this.refs.toast.show('用户名未填写');
            return;
        }else if(password==null||password===''){
            this.refs.toast.show('密码未填写');
            return;
        }

        let user = {username: username, password: password, api_key: 'thekey', api_secret: 'thesecret'};
        userRequest.login(user)
            .then(res=>{
                if(res.access_token){
                    let auth = res;
                    userRequest.me({'Content-Type': 'application/json', Authorization: 'Bearer ' + res.access_token})
                        .then(res=>{
                            if(res.id){
                                user = Object.assign(res, auth);
                                this.props.userActions.login(user);
                                this.props.navigation.goBack();
                            }
                        });

                }else{
                    this.refs.toast.show('用户名或密码填写错误');
                }
            })
    };

    render() {
        return (
            <ImageBackground style={{width: width, height: height, position: 'relative'}} source={require('../../images/bg_login.jpg')}>
                <Toast ref="toast"/>

                <HeaderComponent
                    headerLeft={(
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='navigate-before' color='#e5b894' size={25} />
                        </TouchableOpacity>
                    )}
                    headerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}}
                />
                <ScrollView keyboardDismissMode='on-drag'>
                    <View style={styles.container}>
                        <Toast ref="toast"/>
                        <Image source={require('../../images/logo.png')} style={styles.logo} />
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(text)=>this.setState({username: text})}
                            style={styles.input} placeholder='用户名'
                            defaultValue='merchant@example.com'
                        />
                        <TextInput
                            onChangeText={(text)=>this.setState({password: text})}
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder='密码'
                            defaultValue='secret'
                        />
                        <TouchableOpacity style={styles.login} onPress={this.login}>
                            <Text style={{color: '#fff'}}>立即登录</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </ImageBackground>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        user: state.user,
        nav: state.nav
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogin)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20%',
    },
    header: {
        fontSize: 40,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 30,
        color: '#666'
    },
    logo: {
        width: 160,
        height: 100,
        marginBottom: 70,
    },
    input: {
        width: width-100,
        margin: 10,
        padding: 10,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 30,
        color: '#999'
    },
    login: {
        height: 35,
        marginTop: 10,
        width: width-100,
        borderRadius: 30,
        backgroundColor: '#e5b894',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
