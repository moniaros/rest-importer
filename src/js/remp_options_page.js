jQuery( document ).ready( function( $ ) {
	// based on: https://github.com/WebDevStudios/CMB2-Snippet-Library/blob/master/javascript/dynamically-change-group-field-title-from-subfield.php
	
	var $box = $('#cmb2-metabox-remp_options_sources, #cmb2-metabox-remp_options_mapping, #cmb2-metabox-remp_options_import');
	
	function getTitleBar_all() {
		$box.find( '.cmb-group-title' ).each( function() {
			_replaceTitles( $( this ) );
		});
	}
	
	function getTitleBar_this( evt ) {
		var id = 'id';
		if ( evt.target.id.indexOf(id, evt.target.id.length - id.length) !== -1 || /\[state\]$/.test( evt.target.name ) || /\[source\]$/.test( evt.target.name )  ) {
			_replaceTitles( $(evt.target).parents('.cmb-repeatable-grouping').find( '.cmb-group-title' ));
		}
	}
	
	function _replaceTitles( $titleBar ){
		var txt = '<span>' + $titleBar.next().find( '[id$="id"]' ).val() + '</span>';

		if ( $box.attr('id') === 'cmb2-metabox-remp_options_import'){
			txt += '<span>' + $titleBar.next().find( '[name$="[state]"]:checked' ).next('label').text() + '</span>';
			txt += '<span>' + $titleBar.next().find( '[name$="[source]"]:checked' ).next('label').text() + '</span>';
		}
		
		var rowindex;
		if ( ! txt ) {
			txt = $box.find( '[data-grouptitle]' ).data( 'grouptitle' );
			if ( txt ) {
				rowindex = $titleBar.parents( '[data-iterator]' ).data( 'iterator' );
				txt = txt.replace( '{#}', ( rowindex + 1 ) );
			}
		}
		if ( txt ) {
			txt = '<div class="">' + txt + '</div>';
			$titleBar.html( txt );
		}

	}
	
	// init
	getTitleBar_all();
	$box.on( 'cmb2_add_row cmb2_shift_rows_complete', function(evt){
		getTitleBar_all(evt);
	}).on( 'keyup change', function(evt){
		getTitleBar_this(evt);
	} );
			
});