import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Vibration,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
    ScrollView,
    Keyboard
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import { Sae, Akira } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ViewFinder from './viewFinder';
import {HeaderComponent} from "../../../components/header";
import { Toast } from "../../../components/toast";
import * as userActions from "../../../redux/actions/user";
import * as userRequest from "../../../api/user";

const {width, height}  = Dimensions.get('window');

class Consume extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            transCode:'',//条码
            openFlash: false,
            active: false,
            flag:true,
            fadeInOpacity: new Animated.Value(0), // 初始值
            isEndAnimation:false,//结束动画标记,
            order: '15195165577'
        }
    }
    componentDidMount() {
        this._startAnimation(false);
        console.log(this.props);
    }
    //开始动画，循环播放
    _startAnimation(isEnd) {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear
        }).start(
            () => {
                if (isEnd){
                    this.setState({
                        isEndAnimation:true
                    });
                    return;
                }
                if (!this.state.isEndAnimation){
                    this.state.fadeInOpacity.setValue(0);
                    this._startAnimation(false)
                }
            }
        );
    }
    barcodeReceived = (e)=>{
        console.log(CanScan);
        if (CanScan) {
            Vibration.vibrate([0, 500, 200, 500]);
            this.props.navigation.navigate('ConsumePay', {order: e.data});
            CanScan = false;
            this.setState({
                active: false
            })
        }
    };

    searchCustomer = ()=>{
        console.log(this.state.order);
        userRequest.customer({mobile: this.state.order})
            .then((res)=>{
                if(res.result==='ok'){
                    this.props.navigation.navigate('ConsumePay', {customer: res.data});
                }else{
                    this.refs.toast.show(res.message);
                }
            })
    };

    render(){
        const {
            openFlash,
            active,
        } = this.state;
        return(
            <View style={styles.allContainer}>
                <Toast ref='toast' />
                {this.state.active
                    ?
                    (
                        <Camera
                            ref={cam => this.camera = cam}
                            style={styles.cameraStyle}
                            barcodeScannerEnabled={true}
                            onBarCodeRead={this.barcodeReceived}
                            torchMode={openFlash ? 'on' : 'off'}>

                            <HeaderComponent
                                headerLeft={(
                                    <TouchableOpacity onPress={()=>this.setState({active: false})}>
                                        <Icon name='close' color='#fff' size={25} />
                                    </TouchableOpacity>
                                )}
                                headerStyle={{backgroundColor: '#000', opacity: 0.5, borderBottomWidth: 0}}
                            />

                            <View style={styles.centerContainer}/>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.fillView}/>
                                <View style={styles.scan}>
                                    <ViewFinder/>
                                    <Animated.View style={[styles.scanLine, {
                                        opacity: 1,
                                        transform:[{translateY:this.state.fadeInOpacity.interpolate({inputRange:[0,1], outputRange:[0,220]})}]
                                    }]}>
                                        <View style={{width: 220, height: 2,backgroundColor: 'rgba(0,255,0,0.5)'}} />

                                    </Animated.View>
                                </View>
                                <View style={styles.fillView}/>
                            </View>
                            <View style={styles.bottomContainer}>
                                <Text
                                    style={[styles.text, {textAlign: 'center', width: 220, marginTop: active ? 25 : 245,},]}
                                    numberOfLines={2}
                                >
                                    将运单上的条码放入框内即可自动扫描。
                                </Text>
                                <TouchableOpacity onPress={()=>this.setState({openFlash: !this.state.openFlash})}>
                                    <View style={styles.flash}>
                                        <Icon name='settings-remote' size={35} color='#3f0'/>
                                        <Text style={styles.text}>
                                            开灯/关灯
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    )
                    :
                    (
                        <View>
                            <HeaderComponent
                                headerLeft={(
                                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                                        <Icon name='navigate-before' color='#fff' size={25} />
                                    </TouchableOpacity>
                                )}
                                headerRight={(
                                    <TouchableOpacity onPress={()=>{
                                        this.setState({active: true});
                                        Keyboard.dismiss();
                                    }}>
                                        <Icon name='photo-camera' color='#fff' size={25} />
                                    </TouchableOpacity>
                                )}
                                headerTitle={<Text style={{color: '#fff', fontSize: 16}}>会员信息</Text>}
                                headerStyle={{backgroundColor: '#a876b0', borderBottomWidth: 0}}
                            />

                            <ScrollView keyboardDismissMode='on-drag' style={styles.containerInputBox}>
                                <Akira
                                    label={'手机或卡号查询'}
                                    borderColor={'#a975b1'}
                                    labelStyle={{ color: '#a975b1' }}
                                    inputStyle={{color: '#aaa'}}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    autoFocus={true}
                                    keyboardType='numeric'
                                    onChangeText = {(text)=>this.setState({order: text})}
                                    defaultValue = '15195165577'
                                />

                                {
                                    this.state.order!=null&&this.state.order!==''
                                        ?
                                        (
                                            <TouchableOpacity
                                                style={styles.submit}
                                                onPress={this.searchCustomer}
                                            >
                                                <Text style={{color: '#fff', fontSize: 16}}>查询</Text>
                                            </TouchableOpacity>
                                        )
                                        :
                                        null
                                }

                            </ScrollView>

                        </View>
                    )
                }
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
)(Consume)

const styles =StyleSheet.create({
    allContainer:{
        flex:1,
    },
    container: {
        ...Platform.select({
            ios: {
                height: 64,
            },
            android: {
                height: 50
            }
        }),
        backgroundColor: '#000',
        opacity:0.5
    },
    titleContainer: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 15,
            },
            android: {
                paddingTop: 0,
            }
        }),
        flexDirection: 'row',
    },
    leftContainer: {
        flex:0,
        justifyContent: 'center',
    },
    backImg: {
        marginLeft: 10,
    },
    cameraStyle: {
        alignSelf: 'center',
        width: width,
        height: height,
    },
    flash: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 60,
    },
    flashIcon: {
        fontSize: 1,
        color: '#fff',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        marginTop:5,
        marginBottom: 10,
    },
    icon:{
        color:'#fff',
        fontSize:20,
    },
    scanLine:{
        alignSelf:'center',
    },
    centerContainer:{
        ...Platform.select({
            ios: {
                height: 80,
            },
            android: {
                height: 60,
            }
        }),
        width:width,
        backgroundColor:'#000',
        opacity:0.5
    },
    bottomContainer:{
        alignItems:'center',
        backgroundColor:'#000',
        alignSelf:'center',
        opacity:0.5,
        flex:1,
        width:width
    },
    fillView:{
        width: (width-220)/2,
        height: 220,
        backgroundColor: '#000',
        opacity: 0.5
    },
    scan:{
        width: 220,
        height: 220,
        alignSelf: 'center'
    },

    containerInputBox: {
        padding: 20,
        height: '100%',
        paddingTop: '40%',
    },
    submit: {
        marginTop: 30,
        backgroundColor: '#ffbb6e',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }


})