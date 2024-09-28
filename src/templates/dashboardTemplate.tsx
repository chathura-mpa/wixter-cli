const componentTemplate = (componentName: string) => {
    const interfaceName = `${componentName}Props`;

    return `
        import React from 'react';

        interface ${interfaceName} {
            // Define prop types here
            // Example:
            // title: string;
            // onClick: () => void;
        }

        const ${componentName}: React.FC<${interfaceName}> = (props) => {
            return <div>{props.title} component</div>;
        };

        export default ${componentName};
    `;
};

const customHookTemplate = (hookName: string) => {
    return `
        import { useState, useEffect } from 'react';

        interface FetchDataResult<T> {
            data: T | null;
            loading: boolean;
            error: Error | null;
        }

        const use${hookName} = <T>(): FetchDataResult<T> => {
            const [data, setData] = useState<T | null>(null);
            const [loading, setLoading] = useState<boolean>(true);
            const [error, setError] = useState<Error | null>(null);

            useEffect(() => {
                // Your effect logic here
                // Example: fetch data
                const fetchData = async () => {
                    try {
                        const response = await fetch('your-api-endpoint');
                        const result = await response.json();
                        setData(result);
                    } catch (err) {
                        setError(err as Error);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchData();
            }, []); // Add dependencies here if needed

            return { data, loading, error };
        };

        export default use${hookName};
    `;
};

export { componentTemplate, customHookTemplate };