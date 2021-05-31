import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '../constants/colors';
import { addHealth } from '../store/actions';
import { getHealthData } from '../store/selectors';
import { simulateAsyncCall } from '../utils';

const renderInput = (placeholder, styles, onBlur, onChange, value, ...rest) => (
  <TextInput
    placeholder={placeholder}
    placeholderTextColor={colors.placeholder}
    style={styles}
    onBlur={onBlur}
    onChangeText={(val) => onChange(val)}
    value={value}
    {...rest[0]}
  />
);

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

const Health = (props) => {
  const [loading, setLoading] = useState(false);
  const [tobacco, setTobacco] = useState(false);

  const dispatch = useDispatch();
  const defaultData = useSelector(getHealthData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (defaultData?.tobacco) {
      setTobacco(defaultData?.tobacco);
    }
  }, [defaultData]);

  const onSubmit = useCallback(
    (data) => {
      setLoading(true);
      const formData = { ...data, tobacco };
      simulateAsyncCall(formData)
        .then((res) => {
          dispatch(addHealth(res));
          setLoading(false);
          props.setActiveStep(props.activeStep + 1);
        })
        .catch(() => setLoading(false));
    },
    [dispatch, props, tobacco],
  );

  const onPreviousStep = useCallback(() => {
    if (loading) {
      return;
    }
    props.setActiveStep(props.activeStep - 1);
  }, [props, loading]);

  const renderPreviousButton = useCallback(() => {
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={onPreviousStep}>
        <Text
          style={{
            ...styles.btnTextStyle,
            ...(loading && styles.disabledBtnText),
          }}>
          Previous
        </Text>
      </TouchableOpacity>
    );
  }, [onPreviousStep, loading]);

  const renderNextButton = useCallback(() => {
    return loading ? (
      <ActivityIndicator color={colors.primary} />
    ) : (
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.btnTextStyle}>Next</Text>
      </TouchableOpacity>
    );
  }, [handleSubmit, onSubmit, loading]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView {...props}>
        <View style={styles.container}>
          <Text style={styles.title}>Now, a closer look</Text>
          <View style={boxStyles(errors?.heightFeet || errors?.heightInches)}>
            <Text style={{ ...styles.formTitle, borderBottomWidth: 1 }}>
              Height (ft./in.)
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) =>
                  renderInput('ft', styles.height, onBlur, onChange, value, {
                    maxLength: 1,
                    keyboardType: 'numeric',
                  })
                }
                name="heightFeet"
                rules={{ required: true }}
                defaultValue={defaultData?.heightFeet}
              />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) =>
                  renderInput('in', styles.height, onBlur, onChange, value, {
                    maxLength: 2,
                    keyboardType: 'numeric',
                  })
                }
                name="heightInches"
                rules={{ required: true }}
                defaultValue={defaultData?.heightInches}
              />
            </View>
          </View>
          {renderError(errors?.heightFeet || errors?.heightInches)}
          <View style={boxStyles(errors?.weight)}>
            <Text style={{ ...styles.formTitle, borderBottomWidth: 1 }}>
              Weight (Kgs)
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) =>
                renderInput('Kgs', styles.input, onBlur, onChange, value, {
                  maxLength: 3,
                  keyboardType: 'numeric',
                })
              }
              name="weight"
              rules={{ required: true }}
              defaultValue={defaultData?.weight}
            />
          </View>
          {renderError(errors?.weight)}
          <View style={{ ...styles.box, marginBottom: 20 }}>
            <Text style={styles.formTitle}>
              Have you used any tobacco products in last 5 years?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={tobacco ? styles.selectedButton : styles.button}
                onPress={() => setTobacco(true)}>
                <Text>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={!tobacco ? styles.selectedButton : styles.button}
                onPress={() => setTobacco(false)}>
                <Text>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <View style={styles.prevBtn}>{renderPreviousButton()}</View>
        <View style={styles.nextBtn}>{renderNextButton()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    paddingHorizontal: 20,
    paddingBottom: 20,
    color: colors.grey,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  box: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    marginTop: 25,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  button: {
    width: '35%',
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    width: '35%',
    height: 40,
    backgroundColor: colors.lightBlue,
    color: 'white',
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    padding: '4%',
    width: '100%',
    color: colors.borderColor,
    fontWeight: 'bold',
    borderBottomColor: colors.grey,
  },
  input: {
    width: '100%',
    fontSize: 20,
    paddingHorizontal: '4%',
    alignSelf: 'center',
    color: 'black',
  },
  height: {
    flex: 12 / 6,
    fontSize: 20,
    borderRightWidth: 1,
    borderColor: colors.placeholder,
    textAlign: 'center',
    color: 'black',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 60,
  },
  prevBtn: {
    position: 'absolute',
    left: 60,
    bottom: 15,
  },
  nextBtn: {
    position: 'absolute',
    right: 60,
    bottom: 15,
  },
  btnStyle: {
    textAlign: 'center',
    padding: 8,
  },
  btnTextStyle: {
    color: colors.primary,
    fontSize: 18,
  },
  disabledBtnText: {
    color: '#cdcdcd',
  },
});

export default Health;
