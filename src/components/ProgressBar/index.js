import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StepIcon from './Icon';

const ProgressBar = (props) => {
  const [stepCount, setStepCount] = useState(0);
  const [activeStep, setActiveStep] = useState(props.activeStep);

  useEffect(() => {
    setStepCount(React.Children.count(props.children));
  }, [props.children]);

  useEffect(() => {
    setActiveStep(props.activeStep);
  }, [props.activeStep]);

  const renderStepIcons = () => {
    let step = [];

    Array(stepCount)
      .fill()
      .map((_, i) => {
        const isCompletedStep = i < activeStep;
        const isActiveStep = i === activeStep;
        step.push(
          <View key={i}>
            <StepIcon
              {...props}
              label={props.children[i].props.label}
              isFirstStep={i === 0}
              isLastStep={i === stepCount - 1}
              isCompletedStep={isCompletedStep}
              isActiveStep={isActiveStep}
            />
          </View>,
        );
      });

    return step;
  };

  const activeStepSetter = (step) => {
    if (step >= stepCount - 1) {
      setActiveStep(stepCount - 1);
    }
    if (step > -1 && step < stepCount - 1) {
      setActiveStep(step);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.stepIcons}>{renderStepIcons()}</View>
      <View style={{ flex: 1 }}>
        {React.cloneElement(props.children[activeStep], {
          setActiveStep: activeStepSetter,
          activeStep: activeStep,
          stepCount: stepCount,
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepIcons: {
    position: 'relative',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flexDirection: 'row',
    top: 30,
    marginBottom: 50,
  },
});

ProgressBar.defaultProps = {
  activeStep: 0,
};

export default ProgressBar;
