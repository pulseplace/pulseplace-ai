
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SurveyList from '@/components/dashboard/SurveyList';
import SurveyForm from '@/components/dashboard/SurveyForm';
import SurveyDetail from '@/components/dashboard/SurveyDetail';

const Surveys = () => {
  const { surveyId } = useParams();
  const location = useLocation();
  
  // Show survey form if creating a new survey
  if (location.pathname.endsWith('/new')) {
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Survey</h1>
        <SurveyForm />
      </div>
    );
  }

  // Show survey details if viewing a specific survey
  if (surveyId) {
    return (
      <div className="container mx-auto">
        <SurveyDetail surveyId={surveyId} />
      </div>
    );
  }

  // Show survey list by default
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Surveys</h1>
      <SurveyList />
    </div>
  );
};

export default Surveys;
