import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF5E4', 
        borderRadius: 40, 
        elevation: 3,
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 5,
        underlayColor: 'grey',
        color: 'white',
    },

    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
    }
})