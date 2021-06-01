import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import MultiInput from '../components/Input/MultiInput';
import { colors } from '../constants/colors';
import { addBasics } from '../store/actions';
import { getBasicsData } from '../store/selectors';
import { simulateAsyncCall } from '../utils';

const Basics = (props) => {
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('male');

  const dispatch = useDispatch();
  const defaultData = useSelector(getBasicsData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (defaultData?.gender) {
      setGender(defaultData?.gender);
    }
  }, [defaultData]);

  const onSubmit = useCallback(
    (data) => {
      setLoading(true);
      const formData = { ...data, gender };
      simulateAsyncCall(formData)
        .then((res) => {
          dispatch(addBasics(res));
          setLoading(false);
          props.setActiveStep(props.activeStep + 1);
        })
        .catch(() => setLoading(false));
    },
    [dispatch, gender, props],
  );

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
  }, [handleSubmit, loading, onSubmit]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Let's start with the basics</Text>
          <Input
            title="First Name"
            placeholder="First Name"
            control={control}
            name="firstName"
            inputStyles={styles.input}
            error={errors?.firstName}
            data={defaultData?.firstName}
          />
          <Input
            title="Last Name"
            placeholder="Last Name"
            control={control}
            name="lastName"
            inputStyles={styles.input}
            error={errors?.lastName}
            data={defaultData?.lastName}
          />
          <MultiInput
            title="Date of birth"
            placeholders={['dd', 'mm', 'yyyy']}
            control={control}
            names={['date', 'month', 'year']}
            inputProps={[{ maxLength: 2 }, { maxLength: 2 }, { maxLength: 4 }]}
            inputStyles={styles.dob}
            error={errors?.date || errors?.month || errors?.year}
            data={defaultData}
          />
          <View style={{ ...styles.box, marginBottom: 20 }}>
            <Text style={styles.formTitle}>Gender</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={
                  gender === 'male' ? styles.selectedButton : styles.button
                }
                onPress={() => setGender('male')}>
                <Text>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  gender === 'female' ? styles.selectedButton : styles.button
                }
                onPress={() => setGender('female')}>
                <Text>Female</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
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
  dob: {
    flex: 9 / 3,
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
    right: '45%',
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

export default Basics;
