import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HeaderComponent} from "../../components/header";
const { width, height } =  Dimensions.get('window');
class Menu extends Component{

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {

        }
    }

    toNavigate = (path)=>{
        if(path==null){
            alert('功能暂未开放');
            return;
        }
        if(this.props.user.username){
            this.props.navigation.navigate(path)
        }else{
            this.props.navigation.navigate('UserLogin')
        }
    };



    render(){
        console.log(this.props);

        let menu = [
            { name: 'account-circle', text: '联系人', path: 'UserCreate', color: '#f14252'},
            { name: 'assignment', text: '消费', path: 'Consume', color: '#f7795c'  },
            { name: 'monetization-on', text: '优惠券', path: null, color: '#f4528e'  },
            { name: 'credit-card', text: '会员卡', path: null, color: '#f4528e'  },
            { name: 'history', text: '历史记录', path: null, color: '#a876b0'  },
            { name: 'settings', text: '设置', path: 'Setting', color: '#91578f' },
        ]
        return(
            <View>

                <HeaderComponent
                    headerLeft={(
                        <TouchableOpacity>
                            <Icon name='notifications' color='#fff' size={25} />
                        </TouchableOpacity>
                    )}
                    headerTitle={<Text style={{color: '#fff', fontSize: 16}}>商户中心</Text>}
                    headerRight={(
                        <TouchableOpacity onPress={()=>this.toNavigate('Setting')}>
                            <Icon name='settings' color='#fff' size={25} />
                        </TouchableOpacity>
                    )}
                    headerStyle={{backgroundColor: '#a876b0', borderBottomWidth: 0}}
                />
                
                <View style={styles.itemBox}>
                    {
                        menu.map((item)=>(
                            <TouchableOpacity
                                style={styles.item}
                                key={item.name}
                                onPress={this.toNavigate.bind(this, item.path)}
                            >
                                <Icon name={item.name} size={80} color={item.color} />
                                <Text style={styles.text}>{item.text}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>


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

export default connect(
    mapStateToProps
)(Menu)



const styles = StyleSheet.create({

    itemBox: {
        backgroundColor: '#fff',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    item: {
        width: width/2,
        height: 150,
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 5,
        fontSize: 18,
    }

});
