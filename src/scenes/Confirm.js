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

  const renderNextButton = useCallback(() => {
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
            <View style={styles.keyContainer}>
              <Text style={styles.key}>Full Name: </Text>
              <Text style={styles.value}>{`${firstName} ${lastName}`}</Text>
            </View>
            <View style={styles.keyContainer}>
              <Text style={styles.key}>Gender: </Text>
              <Text style={styles.value}>
                {gender === 'male' ? 'Male' : 'Female'}
              </Text>
            </View>
            <View style={styles.keyContainer}>
              <Text style={styles.key}>Date of Birth: </Text>
              <Text
                style={
                  styles.value
                }>{`${dob?.date} / ${dob?.month} / ${dob?.year}`}</Text>
            </View>
            <View style={styles.keyContainer}>
              <Text style={styles.key}>Height: </Text>
              <Text
                style={
                  styles.value
                }>{`${height.feet} ft. ${height?.inches} in.`}</Text>
            </View>
            <View style={styles.keyContainer}>
              <Text style={styles.key}>Weight: </Text>
              <Text style={styles.value}>{`${weight} Kgs`}</Text>
            </View>
            <View style={{ ...styles.keyContainer, borderBottomWidth: 0 }}>
              <Text style={styles.key}>Tobacco Consumption: </Text>
              <Text style={styles.value}>{tobacco ? 'Yes' : 'No'}</Text>
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
