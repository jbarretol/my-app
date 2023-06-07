import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const App = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const handleConversion = async () => {
    try {
      const response = await axios.get(
        'https://api.exchangerate-api.com/v4/latest/USD'
      );
      const exchangeRates = response.data.rates;
      const convertedValue = (parseFloat(value) * exchangeRates.EUR).toFixed(2);
      setResult(`${value} USD = ${convertedValue} EUR`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ marginBottom: 10, paddingHorizontal: 10, borderWidth: 1 }}
        placeholder="Digite o valor em USD"
        value={value}
        onChangeText={(text) => setValue(text)}
        keyboardType="numeric"
      />
      <Button title="Converter" onPress={handleConversion} />
      {result ? <Text style={{ marginTop: 10 }}>{result}</Text> : null}
    </View>
  );
};

export default App;
