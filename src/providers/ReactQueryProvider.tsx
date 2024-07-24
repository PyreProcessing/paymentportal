'use client';
import React from 'react';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, message } from 'antd';
import { useState } from 'react';
import { default as themeOverride } from '@/styles/theme.json'; 

function ReactQueryProvider({ children }: React.PropsWithChildren) { 
  const [client] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          console.log(error);
          message.error(error.message as any);
        },
      }),
    })
  );

  return (
    <QueryClientProvider client={client}>
      <ConfigProvider theme={themeOverride}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
