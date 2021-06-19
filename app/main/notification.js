const { Notification } = require( 'electron' );

// display files added notification
exports.filesAdded = ( size ) => {
    const notif = new Notification( {
        title: 'Files added',
        body: `${ size } file(s) has been successfully added.`
    } );

    notif.show();
};

exports.filesAddedToCloud = ( size ) => {
    const notif = new Notification( {
        title: 'Files added',
        body: `${ size } file(s) has been successfully added to the cloud.`
    } );

    notif.show();
};

exports.filesDeletedFromCloud = ( size ) => {
    const notif = new Notification( {
        title: 'Files deleted',
        body: `${ size } file(s) has been successfully deleted from the cloud.`
    } );

    notif.show();
};