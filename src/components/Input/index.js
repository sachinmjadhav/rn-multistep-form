import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../../constants/colors';

const renderError = (error) =>
  error ? (
    <Text style={{ fontSize: 10, color: 'red', paddingHorizontal: 10 }}>
      This is required.
    </Text>
  ) : (
    <View style={{ height: 14, width: '100%' }} />
  );

const boxStyles = (error) => ({
  flex: 1,
  width: '100%',
  marginTop: 25,
  borderTopWidth: 1,
  alignSelf: 'center',
  borderBottomWidth: 1,
  backgroundColor: 'white',
  borderColor: error ? 'red' : colors.grey,
});

const Input = ({
  data,
  name,
  title,
  error,
  control,
  placeholder,
  inputStyles,
  ...rest
}) => (
  <>
    <View style={boxStyles(error)}>
      <Text style={styles.formTitle}>{title}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            style={inputStyles}
            placeholder={placeholder}
            onChangeText={(val) => onChange(val)}
            placeholderTextColor={colors.placeholder}
            {...rest}
          />
        )}
        name={name}
        rules={{ required: true }}
        defaultValue={data}
      />
    </View>
    {renderError(error)}
  </>
);

const styles = StyleSheet.create({
  formTitle: {
    padding: '4%',
    width: '100%',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    color: colors.borderColor,
    borderBottomColor: colors.grey,
  },
});

export default Input;
