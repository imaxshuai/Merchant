import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button } from 'antd-mobile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import * as userActions from '../../redux/actions/user';
import {HeaderComponent} from "../../components/header";
const { width, height } =  Dimensions.get('window');
import { Sae, Akira } from 'react-native-textinput-effects';

class Setting extends Component{

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            order: null,
        }
    }

    loginOut = ()=>{
        this.props.userActions.loginOut();
        this.props.navigation.goBack();
    };

    render(){
        return(
            <View style={{flex: 1}}>
                <HeaderComponent
                    headerLeft={(
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='navigate-before' color='#fff' size={25} />
                        </TouchableOpacity>
                    )}
                    headerTitle={<Text style={{color: '#fff', fontSize: 16}}>设置</Text>}
                    headerStyle={{backgroundColor: '#a876b0', borderBottomWidth: 0}}
                />

                <ScrollView style={styles.container}>


                </ScrollView>

                <TouchableOpacity style={styles.login} onPress={this.loginOut}>
                    <Text style={{color: '#fff', fontSize: 18}}>退出登录</Text>
                </TouchableOpacity>

            </View>
        )
    }

}

const mapStateToProps = (state)=>{
    return{
        user: state.user,
        nav: state.nav
    }
};

const mapDispatchToProps = (dispatch)=>{
    return{
        userActions: bindActionCreators(userActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting)



const styles = StyleSheet.create({

    container: {
        marginTop: height/2-150,
        padding: 20,
    },
    login: {
        marginTop: 30,
        backgroundColor: '#a876b0',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
