import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from 'react-native'
import api from "./services/api"

//   ->  não possuem valor semantico (significado)
//   ->  Não possuem estilização
//   ->  Todos componentes são display: flex
//   ->  não há herança de estilos 

// View: qualquer container usado em html (div, header, footer, main ...)
// Text: qualquer bloco de texto ( p, span, strong, h1, h2, ...)

export default function App() {
    const [ users, setUsers ] = useState([])

    useEffect( () => {
        api.get('users')
            .then( response => {
                setUsers(response.data)
            })
            .catch( error => console.log(error) )
    }, [] )

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#aaaadd" translucent/>

            <SafeAreaView style={styles.container}>

                <FlatList 
                    data={users}
                    keyExtractor={user => user.id}
                    renderItem={ ({ item }) => (
                        <Text style={styles.user}>{item.name}</Text>
                    )}
                />

            </SafeAreaView>

            {/* <View style={styles.container}> 
                {users.map(user => <Text key={user.id} style={styles.user}>{user.name}</Text>)}
            </View> */}

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaaadd',      
    },
    user: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    }

})