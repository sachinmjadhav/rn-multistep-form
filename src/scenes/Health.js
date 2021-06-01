import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import MultiInput from '../components/Input/MultiInput';

import { colors } from '../constants/colors';
import { addHealth } from '../store/actions';
import { getHealthData } from '../store/selectors';
import { simulateAsyncCall } from '../utils';

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
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Now, a closer look</Text>
          <MultiInput
            title="Height (ft./in.)"
            placeholders={['ft', 'in']}
            control={control}
            names={['heightFeet', 'heightInches']}
            inputProps={[{ maxLength: 1 }, { maxLength: 2 }]}
            inputStyles={styles.height}
            error={errors?.heightFeet || errors?.heightInches}
            data={defaultData}
          />
          <Input
            title="Weight (Kgs)"
            placeholder="Kgs"
            control={control}
            name="weight"
            inputStyles={styles.input}
            error={errors?.weight}
            data={defaultData?.weight}
            keyboardType="numeric"
          />
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
