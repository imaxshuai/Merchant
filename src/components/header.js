import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    SafeAreaView
} from 'react-native';
import PropTypes from 'prop-types';

export class HeaderComponent extends Component {

    static PropTypes = {
        headerStyle: PropTypes.object,
        headerLeft: PropTypes.node,
        headerLeftStyle: PropTypes.object,
        headerTitle: PropTypes.node,
        headerTitleStyle: PropTypes.object,
        headerRight: PropTypes.node,
        headerRightStyle: PropTypes.object,
    };

    constructor(props){
        super(props);
    }

    render(){
        return(
            <SafeAreaView style={[styles.container, this.props.headerStyle]}>
                {/* 左边 */}
                <View style={[styles.headerLeft, this.props.headerLeftStyle]}>
                    {this.props.headerLeft}
                </View>
                {/* 中间 */}
                <View style={[styles.headerTitle, this.props.headerTitleStyle]}>
                    {this.props.headerTitle}
                </View>
                {/* 右边 */}
                <View style={[styles.headerRight, this.props.headerRightStyle]}>
                    {this.props.headerRight}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },

    headerLeft: {
        width: '25%',
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    headerTitle: {
        width: '50%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRight: {
        width: '25%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
    },

});