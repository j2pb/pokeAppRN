
import React from 'react';
import { Image, ActivityIndicator, Text, View, StyleSheet, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Details extends React.Component {

    static navigationOptions = {
        headerTitle: <Text style={{
            color: '#fff',
            fontSize: 18,
            flexGrow: 1,
            fontWeight: 'bold'
        }}> Detalles
        </Text>,
        headerStyle: {
            backgroundColor: '#ef5350',
        },
        headerTintColor: '#fff'
    };
    constructor(props) {
        super(props);
        this.state = { isLoading: true, dataSource: {} }
    }

    componentDidMount() {
        let pokemon = this.props.navigation.getParam('pokemon', '');
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.detail) {
                    Alert.alert(
                        responseJson.detail,
                        `Ha ocurrido un error buscando pokemon: ${pokemon}`,
                        [
                            {
                                text: 'OK', onPress: () => {
                                    const navigateAction = NavigationActions.navigate({
                                        routeName: 'Home',
                                        params: {},
                                    });
                                    this.props.navigation.dispatch(navigateAction);
                                }
                            },
                        ],
                        { cancelable: false }
                    )
                } else {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson,
                    }, function () {
                    });
                }
            })
            .catch((error) => {
                console.error(error);

            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        if (this.state.dataSource && this.state.dataSource.sprites) {
            return (
                <View style={styles.content}>
                    <Text style={styles.titleText}>{this.state.dataSource.name}</Text>
                    <Image source={{ uri: this.state.dataSource.sprites.front_default }} style={styles.img} />
                    <Text style={styles.titleText}>Peso: {this.state.dataSource.weight}</Text>
                    <Text style={styles.titleText}>Número: {this.state.dataSource.id}</Text>
                </View>
            );
        } else {
            return (null)
        }
    }
}
const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    img: {
        width: 300,
        height: 300
    },
    content: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center'
    }
});