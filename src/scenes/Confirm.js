import React, { useCallback, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '../constants/colors';
import { clearState } from '../store/actions';
import { getAllData } from '../store/selectors';
import { simulateAsyncCall } from '../utils';

const Item = ({ name, value, style }) => (
  <View style={{ ...styles.keyContainer, ...style }}>
    <Text style={styles.key}>{name}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const Confirm = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const defaultData = useSelector(getAllData);

  const { firstName, lastName, gender, dob, height, weight, tobacco } =
    defaultData || {};

  const onSubmit = useCallback(() => {
    setLoading(true);
    simulateAsyncCall('success')
      .then((res) => {
        dispatch(clearState());
        setLoading(false);
        props.setActiveStep(0);
      })
      .catch(() => setLoading(false));
  }, [dispatch, props]);

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

  const renderSubmitButton = useCallback(() => {
    return loading ? (
      <ActivityIndicator color={colors.primary} />
    ) : (
      <TouchableOpacity style={styles.btnStyle} onPress={onSubmit}>
        <Text style={styles.btnTextStyle}>Submit</Text>
      </TouchableOpacity>
    );
  }, [onSubmit, loading]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView {...props}>
        <View styles={styles.container}>
          <Text style={styles.title}>Confirm your details</Text>
          <View style={styles.detailsContainer}>
            <Item name="Full Name:" value={`${firstName} ${lastName}`} />
            <Item
              name="Gender:"
              value={gender === 'male' ? 'Male' : 'Female'}
            />
            <Item
              name="Date of Birth:"
              value={`${dob?.date} / ${dob?.month} / ${dob?.year}`}
            />
            <Item
              name="Height:"
              value={`${height.feet}ft. ${height?.inches}in.`}
            />
            <Item name="Weight:" value={`${weight}Kgs`} />
            <Item
              name="Tobacco Consumption:"
              value={tobacco ? 'Yes' : 'No'}
              style={{ borderBottomWidth: 0 }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <View style={styles.prevBtn}>{renderPreviousButton()}</View>
        <View style={styles.nextBtn}>{renderSubmitButton()}</View>
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
    color: colors.grey,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 10,
  },
  keyContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.placeholder,
  },
  key: {
    fontSize: 20,
  },
  value: {
    fontSize: 20,
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

export default Confirm;
