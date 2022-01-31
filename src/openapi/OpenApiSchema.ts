export interface OpenApiSchemaProperty {
  /**
   * Indicates if the schema property is required. You should normally not have to set this,
   * it will be deduced from the optional access modifier of the property in the interface.
   */
  required?: boolean;
  description: string;
}

export interface OpenApiSchema<T> {
  description: string;
  properties: { [key in keyof Partial<T>]: OpenApiSchemaProperty };
  example?: T;
}

export interface OpenApiSchemaDescription {}

export const schema = <T>(
  schema: OpenApiSchema<T>
): OpenApiSchemaDescription => {
  return {};
};
