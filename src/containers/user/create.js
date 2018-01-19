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
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Button, Picker, DatePicker, Modal } from 'antd-mobile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Akira, Jiro } from 'react-native-textinput-effects';

import { Toast } from '../../components/toast';
import * as userActions from '../../redux/actions/user';
import {HeaderComponent} from "../../components/header";

const { width, height } = Dimensions.get('window');

class UserCreate extends Component{

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            username: null,
            phone: null,
            sex: null,
            dateVisible: false,
            dateValue: '出生日期',
            visibleModal: false
        }
    }

    submit = ()=>{
        let { username, password, phone, sex, dateValue } = this.state;
        console.log(username);
        if(username==null||username===''){
            this.refs.toast.show('姓名未填写');
            return;
        }else if(phone==null||phone===''){
            this.refs.toast.show('手机号未填写');
            return;
        }else if(sex==null){
            this.refs.toast.show('请选择性别');
            return;
        }else if(dateValue=='出生日期'){
            this.refs.toast.show('请选择出生年月');
            return;
        }
        let userinfo = {
            username: username,
            phome: phone,
            sex: sex,
            birthday: dateValue
        }
        console.log(userinfo);
        this.setState({
            visibleModal: true,
        })
    
    };

    render() {

        return (
            <View style={{flex: 1}}>
                <Toast ref="toast"/>
                <HeaderComponent
                    headerLeft={(
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='navigate-before' color='#fff' size={25} />
                        </TouchableOpacity>
                    )}
                    headerTitle={<Text style={{color: '#fff', fontSize: 16}}>添加用户</Text>}
                    headerStyle={{backgroundColor: '#a876b0', borderBottomWidth: 0}}
                />
                {/*信息录入*/}
                <ScrollView style={styles.form} keyboardDismissMode='on-drag'>
                    <View style={styles.title}>
                        <Text>信息录入</Text>
                    </View>
                    <Jiro
                        label='姓名'
                        borderColor={'#ffbb6e'}
                        inputStyle={{ color: '#fff' }}
                        style={{marginTop: 10}}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text)=>this.setState({username: text})}
                    />
                    <Jiro
                        label='手机号'
                        borderColor={'#ffbb6e'}
                        inputStyle={{ color: '#fff' }}
                        style={{marginTop: 10}}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text)=>this.setState({phone: text})}
                    />
                    <ModalDropdown
                        options={['男', '女', '保密']}
                        defaultValue='性别'
                        style={styles.select}
                        textStyle={{textAlign: 'center', color: '#fff', fontSize: 18}}
                        dropdownStyle={{width: width-40, backgroundColor: 'transparent', height: 95}}
                        dropdownTextHighlightStyle={{color: '#fff',backgroundColor: '#718bf9'}}
                        onSelect={(text)=>this.setState({sex: text})}
                    />
                    <TouchableOpacity
                        style={styles.date}
                        onPress={()=>this.setState({dateVisible: true})}
                    >
                        <Text style={{color: '#fff', fontSize: 18}}>
                            {this.state.dateValue.slice(0, 10)}
                        </Text>
                    </TouchableOpacity>

                    <DatePicker
                        visible={this.state.dateVisible}
                        mode='date'
                        value={this.state.dpValue}
                        onOk={date => this.setState({dateValue: date.toISOString(), dateVisible: false})}
                        onDismiss={() => this.setState({ dateVisible: false })}
                    />

                </ScrollView>

                <TouchableOpacity style={styles.login} onPress={this.submit}>
                    <SafeAreaView>
                        <Text style={{color: '#fff', fontSize: 18, padding: 10}}>创建</Text>
                    </SafeAreaView>
                </TouchableOpacity>
                {/* 创建结果返回 */}
                <Modal
                    visible={this.state.visibleModal}
                    transparent
                    maskClosable={false}
                    onClose={()=>this.setState({visibleModal: false})}
                    footer={[{ text: '完成', onPress: ()=>{
                            this.setState({visibleModal: false});
                            this.props.navigation.goBack();
                        } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                    <View style={styles.modal}>
                        <Icon name='beenhere' size={80} color='#a876b0' />
                        <Text style={styles.modalText}>添加成功</Text>
                    </View>
                </Modal>

            </View>
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
)(UserCreate)

const styles = StyleSheet.create({

    select: {
        width: width-20,
        backgroundColor: '#ffbb6e',
        padding: 13,
        marginTop: 30,
    },
    date: {
        width: width-20,
        height: 45,
        marginTop: 30,
        backgroundColor: '#ffbb6e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        color: '#a876b0',
        marginTop: 20,
        marginBottom: 10,
    },

    form: {
        padding: 10,
    },
    title: {
        borderLeftWidth: 3,
        borderColor: '#ffbb6e',
        padding: 5,
        paddingLeft: 10,
        margin: 10
    },
    login: {
        backgroundColor: '#a876b0',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
