'use strict';

export async function commitWithRetry(session){
  try {
    await session.commitTransaction();
  } catch (err) {
    if (
      err.errorLabels &&
      err.errorLabels.indexOf('UnknownTransactionCommitResult') >= 0
    ) {
      console.info('info', 'INFO', __filename, 'commitWithRetry()', 'UnknownTransactionCommitResult, retrying commit operation ...', err.errorLabels);
      await commitWithRetry(session);
    } else {
      throw err;
    }
  }
}


export async function runTransactionWithRetry(txnFn, session){
  try {
    await txnFn(session);
  } catch (err){
    console.info('info', 'INFO', __filename, 'runTransactionWithRetry()', 'Transaction aborted. Caught exception during transaction.', {});

    // If transient error, retry the whole transaction
    if (err.errorLabels && err.errorLabels.indexOf('TransientTransactionError') >= 0) {
      console.info('info', 'INFO', __filename, 'runTransactionWithRetry()', 'TransientTransactionError, retrying transaction ...', err.errorLabels);
      await runTransactionWithRetry(txnFn, session);
    } else {
      throw err;
    }
  }
}
