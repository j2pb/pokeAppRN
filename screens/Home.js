
import React from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Home extends React.Component {
    static navigationOptions = {
        headerTitle: <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 18,
            flexGrow: 1,
            fontWeight: 'bold'
        }}> PokeApp
        </Text>,
        headerStyle: {
            backgroundColor: '#ef5350',
        }
    };
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    buscarPokemon = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Details',
            params: { pokemon: this.state.text.toLowerCase() },
        });

        this.props.navigation.dispatch(navigateAction);
        this.setState({ text: '' });

    }
    render() {

        return (
            <View style={{ flex: 1, padding: 40 }}>
                <Text>Ingrese id o nombre del pokemon:</Text>
                <TextInput
                    style={{ height: 40, padding: 10 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <Button color="#841584" onPress={this.buscarPokemon} title="Buscar" disabled={!this.state.text}></Button>
            </View>
        );
    }
}