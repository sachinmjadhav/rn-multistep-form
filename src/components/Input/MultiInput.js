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
  backgroundColor: 'white',
  width: '100%',
  alignSelf: 'center',
  marginTop: 25,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: error ? 'red' : colors.grey,
});

const MultiInput = ({
  data,
  error,
  names,
  title,
  control,
  inputProps,
  inputStyles,
  placeholders,
}) => {
  return (
    <>
      <View style={boxStyles(error)}>
        <Text style={styles.formTitle}>{title}</Text>
        <View style={styles.container}>
          {names.map((name, i) => (
            <Controller
              key={i}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  style={inputStyles}
                  keyboardType="numeric"
                  placeholder={placeholders[i]}
                  onChangeText={(val) => onChange(val)}
                  placeholderTextColor={colors.placeholder}
                  {...inputProps[i]}
                />
              )}
              name={name}
              rules={{ required: true }}
              defaultValue={data[name]}
            />
          ))}
        </View>
      </View>
      {renderError(error)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formTitle: {
    padding: '4%',
    width: '100%',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    color: colors.borderColor,
    borderBottomColor: colors.grey,
  },
});

export default MultiInput;
