import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { Modal } from 'antd-mobile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import * as userActions from '../../../redux/actions/user';
import {HeaderComponent} from "../../../components/header";
import {Toast} from "../../../components/toast";
import * as userRequest from "../../../api/user";
const { width, height } =  Dimensions.get('window');
class ConsumePay extends Component{

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            payWay: 'JERIPAY',
            discount1: true,
            discount2: false,
            discount3: false,
            visibleModal: false,
            money: '',
            integral: '',
            payMoney: 0,
        }
    }
    componentDidMount(){
        console.log(this.props);
        setTimeout(()=>CanScan = true,500)
    }

    countAllMoney = (key, value)=>{
        const { money, integral } = this.state;
        if(key==='money'){
            this.setState({
                money: value,
                payMoney: value-integral/100
            });
        }else{
            this.setState({
                integral: value,
                payMoney: money-value/100
            });
        }

    };

    doPay = ()=>{
        let { payWay, money, payMoney, integral } = this.state;
        let customer = this.props.navigation.state.params.customer;
        if(money===''){
            this.refs.toast.show('消费金额未填写');
            return;
        }
        let payInfo = {
            contact_id: customer.id,
            card_id: '1',
            store_id: this.props.user.store_id,
            amount: money,
            pay: payMoney,
            payment: payWay,
            note: '又是一笔消费啊！穷...',
            point_used: integral,
            point_reward: '没有任何奖励哦！ 急死你...',
        };
        console.log(payInfo);
        userRequest.customerPay(
                payInfo,
                {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.props.user.access_token}
            )
            .then((res)=>{
                if(res.result === 'ok'){
                    this.setState({
                        visibleModal: true,
                    })
                }
            });
    };

    render(){
        const payWay = [
            {label: '现金', value: 'xj'},
            {label: '刷卡', value: 'sk'},
            {label: '微信', value: 'wx'},
            {label: '支付宝', value: 'zfb'},
            {label: 'JERIPAY', value: 'jeripay'},
        ];
        console.log(this.props);
        return(
            <View style={styles.container}>
                <Toast ref="toast"/>
                <HeaderComponent
                    headerLeft={(
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='navigate-before' color='#fff' size={25} />
                        </TouchableOpacity>
                    )}
                    headerTitle={<Text style={{color: '#fff', fontSize: 16}}>消费查询</Text>}
                    headerStyle={{backgroundColor: '#a876b0', borderBottomWidth: 0}}
                />

                <ScrollView style={styles.form} keyboardDismissMode='on-drag'>
                    <Sae
                        label={'消费金额 (元)'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor='#a876b0'
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType='numeric'
                        inputStyle={{color: '#ff552e', fontSize: 30, fontWeight: '500', textAlign: 'center'}}
                        onChangeText={this.countAllMoney.bind(this, 'money')}
                    />

                    <Sae
                        label={'使用积分'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor='#a876b0'
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType='numeric'
                        inputStyle={{color: '#ff552e', fontSize: 20, fontWeight: '500', textAlign: 'center'}}
                        onChangeText={this.countAllMoney.bind(this, 'integral')}
                    />

                    <Text style={{color: '#999', marginTop: 10, marginBottom: 20}}>可用积分： 500</Text>

                    <TouchableOpacity style={styles.discount} onPress={()=>this.setState({discount1: !this.state.discount1})}>
                        <Icon name='broken-image' size={40} color='#999' />
                        <Text style={styles.discountText}>满100减10</Text>
                        <Icon name='check-box' size={30} color={this.state.discount1?'#a876b0':'#ccc'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.discount} onPress={()=>this.setState({discount2: !this.state.discount2})}>
                        <Icon name='broken-image' size={40} color='#999' />
                        <Text style={styles.discountText}>双倍积分</Text>
                        <Icon name='check-box' size={30} color={this.state.discount2?'#a876b0':'#ccc'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.discount} onPress={()=>this.setState({discount3: !this.state.discount3})}>
                        <Icon name='broken-image' size={40} color='#999' />
                        <Text style={styles.discountText}>赠送雨伞</Text>
                        <Icon name='check-box' size={30} color={this.state.discount3?'#a876b0':'#ccc'} />
                    </TouchableOpacity>

                    {/* 支付方式 */}
                    <View style={styles.radio}>
                        {
                            payWay.map((item)=>(
                                <Text
                                    style={[styles.radioItem, this.state.payWay===item.label?styles.activeRadioItem:null]}
                                    key={item.value}
                                    onPress={()=>this.setState({payWay: item.label})}>
                                    {item.label}
                                </Text>
                            ))
                        }
                    </View>

                </ScrollView>

                <TouchableOpacity style={styles.login} onPress={this.doPay}>
                    <SafeAreaView>
                        <Text style={{color: '#fff', fontSize: 18, padding: 10}}>支付{this.state.payMoney}元</Text>
                    </SafeAreaView>
                </TouchableOpacity>

                {/* 创建结果返回 */}
                <Modal
                    visible={this.state.visibleModal}
                    transparent
                    maskClosable={false}
                    onClose={()=>this.setState({visibleModal: false})}
                    footer={[{ text: '完成', onPress: ()=>this.props.navigation.goBack() }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <View style={styles.modal}>
                        <Icon name='beenhere' size={80} color='#a876b0' />
                        <Text style={styles.modalText}>交易成功</Text>
                        <View>
                            <Text style={styles.textInfo}>订单号: 201801010213</Text>
                            <Text style={styles.textInfo}>实付金额: {this.state.payMoney}元</Text>
                            <Text style={styles.textInfo}>获得积分: 100分</Text>
                            <Text style={styles.textInfo}>额外奖励: 红包 2.34</Text>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }

}

const mapStateToProps = (state)=>{
    return{
        user: state.user,
        nav: state.nav,
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
)(ConsumePay)



const styles = StyleSheet.create({
    
    container: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    discount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    discountText: {
        width: width-110,
        paddingLeft: 20,
        color: '#888'
    },
    radio: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    radioItem: {
        height: 30,
        lineHeight: 28,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
        backgroundColor: '#ccc',
        color: '#666',
        margin: 5,
        borderRadius: 15,
        overflow: 'hidden'
    },
    activeRadioItem: {
        backgroundColor: '#a876b0',
        color: '#fff',
    },

    login: {
        backgroundColor: '#a876b0',
        // height: 45,
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
    textInfo: {
        padding: 3,
        color: '#666'
    }
});
