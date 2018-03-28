import renderField from './renderField';

export const isReuqired = ({
  schema = {},
  fieldName = '',
}) => {
  // if for this object, there is no required property. that means this property is not required
  if (!schema.required) {
    return false;
  }
  return schema.required.indexOf(fieldName) !== -1;
}

const renderObjectProperties = ({
  schema = {},
  theme = {},
  mutators = {},
  fieldName = '',
}) => Object.keys(schema.properties)
  .map(propertyName => ({
    propertyName,
    propertyOrder: schema.properties[propertyName].propertyOrder,
  }))
  .sort((o1, o2) => {
    if (o1.propertyOrder && o2.propertyOrder) {
      return o1.propertyOrder - o2.propertyOrder;
    }
    return 0;
  })
  .map(item => renderField({
    schema: schema.properties[item.propertyName],
    fieldName: fieldName ? `${fieldName}.${item.propertyName}` : item.propertyName,
    theme,
    required: isReuqired({ 
      schema,
      fieldName: item.propertyName,
    }),
    mutators,
  }));

export default renderObjectProperties;
