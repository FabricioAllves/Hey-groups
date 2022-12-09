import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth'

export default function ChatMessage({ data }) {
    const user = auth().currentUser.toJSON()

    const IsMyMessage = useMemo(() => {
        return data?.user?._id === user.uid
    }, [data])

    return (
        <View style={styles.container}>
            <View style={[styles.messageBox,
            {
                backgroundColor: IsMyMessage ? '#DCFC5' : '#FFF',
                marginLeft: IsMyMessage ? 50 : 0,
                marginRight: IsMyMessage ? 0 : 50
            }
            ]}>
                {!IsMyMessage && <Text style={styles.name}>{data?.user?.displayName}</Text>}
                <Text style={styles.message}>{data.text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    messageBox: {
        borderRadius: 5,
        padding: 10,
    },
    name: {
        color: '#f53745',
        fontWeight: 'bold',
        marginBottom: 5
    }
})